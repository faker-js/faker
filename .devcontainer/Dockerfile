FROM node:16-alpine

RUN apk add bash git curl openssh

# Fetch git completion and git prompt from git/git repo and 
# create a simple bash PS1 that shows git branch and status
RUN curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o /root/git-completion.bash && \
    curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -o /root/git-prompt.sh && \
    echo '. /root/git-prompt.sh' >> ~/.bashrc && \
    echo '. /root/git-completion.bash' >> ~/.bashrc && \
    echo 'export GIT_PS1_SHOWDIRTYSTATE=1' >> ~/.bashrc && \
    echo "export PS1=\"\u->\w\$(__git_ps1 ' (%s)')\\\$ \"" >> ~/.bashrc

RUN npm install -g typescript
