export default interface Database {
  save (element: any): Promise<any>
  update(id: string, updates: any): Promise<any>
}
