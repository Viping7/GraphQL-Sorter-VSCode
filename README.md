# GrapQL Sort

GraphQL schema sort extension VSCode built with the aim to sort the GraphQL schema alphabetically.

![](https://raw.githubusercontent.com/Viping7/GraphQL-Sorter-VSCode/main/sort.gif)


## Features

- Sorts any graphQL schema in alphabetically order
- Support schema sorting for AWS appsync schemas


## Usage

Install the [VSCode GraphQL Schema Sort Extension]().

- Go to the schema file you want to sort, the extension supports `.graphql`, `.gql`  files
- Select all contents to sort and press `ctrl+shift+p`.
- Select `Sort Schema` options and schema will be sorted.

## Known Issues

- For AWS app sync native types the extension can support only AWSJSON as of now.

## Development

This plugin uses the [GraphQL Tools](https://github.com/ardatan/graphql-tools/)

1.  Clone the repository - https://github.com/Viping7/GraphQL-Sorter-VSCode
2.  `npm install`
3.  Open it in VSCode
4.  Go to the debugging section and run the launch program "Extension"
5.  This will open another VSCode instance with extension enabled
6.  Open a project with a graphql schema file


## License

MIT
