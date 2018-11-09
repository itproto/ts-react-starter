# Dictionary Editor

## Quick start

1. Start local json server and client

```sh
npm start
```

2. Run tests

```sh
npm run start
```

Go to http://localhost:3000/?

## Tech used

- react/redux/typescript/reselect
- react-starter/tslint/jest/enzyme
- json-server/REST/axios
- bootstrap
- api-middleware pattern with added prefix support

## Functionality overview

- SPA loads data from json-server for dictionaries and products
- user can switch/modify and apply dictionary
- all updates are saved locally in redux state
- mapping is applied to products table
- validation rules are applied on the component level
- `Validating the entire dictionary regarding consistency` using submit button and spreadsheet cell background to indicate errors
- tests are covering some core validation functionality and products as a good demonstartion on testing redux infrastructure and component (it is quite time-consuming to cover everything)
- in the end added bootstrap library and very minimal styling
- @connect conatiners are sharing same file with underlying components (my preference)

### Color indicators

- red -> validation error
- green -> updated value (you need to save it)
- blue -> mapped value in product table

### Next steps to improve app

- better error handling (catch service errors, ui)
- split `dict-entries-editor` into small functional components (NewEntry, NameEditor, RowRenderer etc.), merge internal state (editedValues/Name) into simple `IDict` structure
- better names `DictValues->entries` etc.
- persist state to server (few minutes work to push redux state to server)
