# Project setup

- [entry](https://github.com/Microsoft/TypeScript-React-Starter)

# TODO

- change folder structure
- linting from template
- load component from shema

* load reducer
* create prefetch component with loading/error handling

```
prefetch(MyComponent, [
    {
        data: 'data',
        load: 'loadData',
        params: ['symbol']
    }
])
```

# FEEDBACK

- inspired by `intro` https://github.com/usablica/intro.js
- show rich popup on click `sweetalert`
- generate screnshot wit `html2canvas`
- draw over image `react-sketch`
- render anchors like in `intro apps`
- show description (help) on hover
- show comment field and comments thread in popup
- get access to redux state

# Prefetch

- component contains information about targetProperty, actionMethod and parameters
- when parameters change - method re-init actionMethod
- when targetProperty has changed? It need to be changed to some flag!

1. <Component targetProperty={undefined} parmater={1}> => load once
2. <Component targetProperty={[1, 2, 3]} parmater={1}> => loaded
3. Programatically clear <Component targetProperty={undefined} parmater={1}>
4. How do I know to reload? (track that property was set, but get updated to undefined)
