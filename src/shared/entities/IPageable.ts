export default interface IPageable<T> {
  result: T[];
  currentPage: number;
  pages: number;
  totalResults: number;
}
