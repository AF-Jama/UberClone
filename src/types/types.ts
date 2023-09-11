export interface LocationResult{
    html_attributions: Array<any>,
    results:{
        business_status:string,
        fomatted_address:string,
        name:string,
    }[]
}


export interface LocationData{
    addressName:string,
    lat:number,
    lng:number,
    placeId:string,   
}