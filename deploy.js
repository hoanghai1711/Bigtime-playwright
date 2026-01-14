import ghpages from 'gh-pages';
import path from 'path';

ghpages.publish(
  path.join(process.cwd(), 'allure-report'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/hoanghai1711/bigtime-playwright.git',
    dotfiles: true,
    history: false,
    message: 'Deploy Allure Report',
    remove: 'allure-report/**/*',
  },
  (err) => {
    if (err) {
      console.error('Deploy failed:', err);
      process.exit(1);
    } else {
      console.log('Deploy success');
    }
  }
);
