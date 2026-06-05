export interface Hewan{
    id?:number;
    nama:string;
    jenis:string;
    tanggal_lahir?:string;
    harga:number;
    status?:string;
    createAt?:string;
    updateAt?:string;
}

export interface APIResponse<T>{
    success:boolean;
    message:string;
    data:T;
}