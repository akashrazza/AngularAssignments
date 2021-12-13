export class Insurance{
    Insurance_Policy_No:number=0 
    Policy_Holders_Name:string=""
    Policy_Amount:number=0
    Amout_for_EMI:number = 0
    Nominees_name:string=""
    // id:number=0;
    constructor(Insurance_Policy_No:number,
        Policy_Holders_Name:string,
        Policy_Amount:number,
        Amout_for_EMI:number,
        Nominees_name:string){
            this.Insurance_Policy_No=Insurance_Policy_No;
            this.Policy_Holders_Name=Policy_Holders_Name;
            this.Policy_Amount=Policy_Amount;
            this.Amout_for_EMI=Amout_for_EMI
            this.Nominees_name=Nominees_name;
        }
}