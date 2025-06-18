class LikeService
  RESPONSE_CODE = {
    sent: 0,
    already_liked: 1,
    matched: 2,
    self_like: 3,
    not_found: 4,
    error: 5
  }.freeze

  def initialize(sender:, receiver:)
    @sender = sender
    @receiver = receiver
  end

  def call
    # 自分自身にはいいねできない
    return RESPONSE_CODE[:self_like] if @sender.id == @receiver.id

    # すでにいいねしてる
    return RESPONSE_CODE[:already_liked] if @sender.sent_likes.exists?(receiver_id: @receiver.id)

    # 相手からもいいねされている場合はマッチ成立する
    @sender.received_likes.exists?(sender_id: @receiver.id) ? create_match : send_like
  rescue StandardError => e
    Rails.logger.error("Error in LikeService: #{e.message}")
    RESPONSE_CODE[:error]
  end

  private

  def send_like
    Like.create(sender: @sender, receiver: @receiver)
    RESPONSE_CODE[:sent]
  end

  def create_match
    ActiveRecord::Base.transaction do
      Like.create(sender: @sender, receiver: @receiver)
      Match.create(user1: @receiver, user2: @sender, matched_at: Time.current)
    end

    RESPONSE_CODE[:matched]
  end
end