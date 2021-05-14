
export class Sort {
    property: string = '';
    inputArray : Array<object> = [];
    constructor(property: string, input: Array<object>){
        this.property = property;
        this.inputArray = input;
    }
    
    sort(){
        let propertyArr = this.property.split('.');
		let len = propertyArr.length;
		this.inputArray.sort((a:any, b:any):any => {
            if(a.kind === 'SchemaDefinition' || b.kind === 'SchemaDefinition'){
                return 0;
            }
            let i = 0;
            while( i < len ) {
                a = a[propertyArr[i]];
                b = b[propertyArr[i]];
                i++;
            }
            if (a?.toLowerCase() < b?.toLowerCase()) {
                return -1;
            } else if (a?.toLowerCase() > b?.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }			
		});
		return this.inputArray;
    }
}