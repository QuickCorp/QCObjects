REGISTRATION_TOKEN=$1

# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permissions to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab CI user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install and run as service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start

sudo apt install -y docker.io

sudo gitlab-runner register -n \
  --url https://gitlab.com/ \
  --registration-token $REGISTRATION_TOKEN \
  --executor shell \
  --description "QCObjects Runner"

sudo usermod -a -G sudo gitlab-runner
sudo usermod -aG docker gitlab-runner
sudo gitlab-runner restart
