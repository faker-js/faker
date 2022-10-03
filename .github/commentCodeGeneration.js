module.exports = async ({ github, context, isSuccess }) => {
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

  const body = `Uncommitted changes were detected after runnning <code>generate</code> command.\nPlease run <code>pnpm run generate:locales</code> or <code>pnpm run generate:api-docs</code> to generate/update the related files, and commit them.`;

  const botComment = comments.find(
    (comment) => comment.user.type === 'Bot' && comment.body.includes(body)
  );

  if (isSuccess) {
    if (!botComment) return;
    await github.rest.issues.deleteComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
    });
    return;
  }

  if (!botComment) {
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body,
    });
  }
};
