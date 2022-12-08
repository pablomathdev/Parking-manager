import Repository from './repository-interface'

export default interface VehicleRepositoryInterface extends Repository {
  update(id: string, updates: any): Promise<any>
}
