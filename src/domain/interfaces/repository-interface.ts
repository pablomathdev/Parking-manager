export default interface Repository {
  create(element: any): Promise<any>
  update(id: string, updates: any): Promise<any>
}
