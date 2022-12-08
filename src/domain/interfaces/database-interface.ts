export default interface Database {
  save (element: any): Promise<any>
}
