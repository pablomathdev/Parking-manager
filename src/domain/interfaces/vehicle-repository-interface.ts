import Repository from './repository-interface'

export interface VehicleRepositoryInterface extends Repository {
  update(id: string, updates: any): Promise<any>
}
