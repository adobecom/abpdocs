const getBreadCrumbsUseCase = (document) => {
  const lis = document.querySelectorAll('.breadcrumbs ul > li');
  return lis ? lis[lis.length - 1].textContent : '';
};

const getuseCaseText = (document) => {
  const useCase = document.querySelector('div.tree-view .title')?.textContent;
  return useCase || getBreadCrumbsUseCase(document);
};

export default getuseCaseText;
