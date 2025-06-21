# GCloud & Terraform CLI Installation Guide

This document provides instructions on how to install the Google Cloud CLI (`gcloud`) and Terraform CLI.

## Google Cloud CLI (`gcloud`)

The Google Cloud CLI is a set of tools to create and manage Google Cloud resources.

### Installation (macOS)

The recommended way to install the gcloud CLI on macOS is by downloading the archive and running the installation script.

1.  Download the appropriate archive for your system.
    *   **Apple Silicon (arm64):** `google-cloud-cli-darwin-arm.tar.gz`
    *   **Intel (x86_64):** `google-cloud-cli-darwin-x86_64.tar.gz`

2.  Extract the archive to your home directory:
    ```bash
    tar -xf google-cloud-cli-*.tar.gz
    ```

3.  Run the install script:
    ```bash
    ./google-cloud-sdk/install.sh
    ```
    The script will guide you through the installation process, including adding the CLI to your `PATH`.

4.  Restart your shell or source your profile file (`.zshrc`, `.bash_profile`, etc.).

5.  Initialize the gcloud CLI:
    ```bash
    gcloud init
    ```
    This command will walk you through authenticating your account and setting up a default project and region/zone.

### Official Documentation

For detailed instructions for other operating systems, please refer to the official documentation:
[Install the gcloud CLI](https://cloud.google.com/sdk/docs/install)

---

## Terraform

Terraform is an infrastructure as code (IaC) tool that lets you build, change, and version infrastructure safely and efficiently.

### Installation (macOS)

The easiest way to install Terraform on macOS is by using [Homebrew](https://brew.sh/).

1.  Add the HashiCorp tap:
    ```bash
    brew tap hashicorp/tap
    ```

2.  Install Terraform:
    ```bash
    brew install hashicorp/tap/terraform
    ```

3.  Verify the installation:
    ```bash
    terraform -v
    ```

### Official Documentation

For detailed instructions for other operating systems, please refer to the official documentation:
[Install Terraform](https://developer.hashicorp.com/terraform/install)
