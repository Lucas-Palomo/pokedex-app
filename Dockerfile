FROM fedora:latest
LABEL authors="palomo"

WORKDIR "/root/app/"

RUN dnf update -y && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    source $HOME/.nvm/nvm.sh && \
    nvm install 18 && \
    node --version


ENTRYPOINT ["/bin/sh", "-c"]
