const loadFromStorage = (scope, json) => {
    scope.item = defaultData;
    scope.item.character.name = json.character.name;
};
