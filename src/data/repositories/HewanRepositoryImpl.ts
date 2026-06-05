import {IHewanRepository} from '../../domain/repositories/IHewanRepository';
import apiClient from '../api/apiClient';
import{Hewan, APIResponse} from '../../domain/entities/Hewan';

export class HewanRepositoryImpl implements IHewanRepository{
    async getAll():Promise<APIResponse<Hewan[]>>{
        const response =await apiClient.get<APIResponse<Hewan[]>>('/hewan');
        return response.data;
    }
    async getById(id:number):Promise<APIResponse<Hewan>>{
        const response =await apiClient.get<APIResponse<Hewan>>(`/hewan/${id}`);
        return response.data;
    }
    

}