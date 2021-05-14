const { print } = require('graphql');
const { getDocumentNodeFromSchema } = require('@graphql-tools/utils');
const { loadSchema } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
import { Sort } from "./sort";

export class SchemaParser {
    path: string = '';
    constructor(path: string){
        this.path = path;
    }
    async parse(){
        var originalSchema;
        try{
            originalSchema = await loadSchema(this.path, {
                loaders: [
                    new GraphQLFileLoader()
                ]
            });
        }catch(e){
            console.log(e);
        }
       
        const defs = getDocumentNodeFromSchema(originalSchema);
        let sorter = new Sort("name.value",defs.definitions)
        defs.definitions = sorter.sort();
        return print(defs);
    }
}
