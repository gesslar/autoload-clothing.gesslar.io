var app = angular.module('app', ['ngSanitize']);
app.controller('c', ($scope, $sce) => {
    $scope.item = defaultData;
    $scope.genders = genders;
    $scope.categories = categories;
    $scope.options = {
        targettable: false
    };
    $scope.temp = {
        identifiers: "",
        long: ""
    };

    $scope.sub = (subby, aud, targetted) => {
        return substituteMessage(subby, aud, targetted, $scope.item.short.text, $scope.item.character);
    };

    $scope.remaining = (tab) => {
        let cnt = 0;

        switch (tab) {
            case "basic":
                if (!$scope.item.character.name) cnt++;
                if (!$scope.item.character.gender) cnt++;
                if (!$scope.item.category) cnt++;
                break;
            case "short":
                if (!$scope.item.short.text) cnt++;
                if (!$scope.item.short.colour) cnt++;
                if (!$scope.item.identifiers) cnt++;
                break;
            case "long":
                if (!$scope.item.long.text) cnt++;
                break;
            case "equip":
                if (!$scope.item.messages.equip.colour) cnt++;
                if (!$scope.item.messages.equip.self.text) cnt++;
                if (!$scope.item.messages.equip.room.text) cnt++;
                break;
            case "unequip":
                if (!$scope.item.messages.unequip.colour) cnt++;
                if (!$scope.item.messages.unequip.self.text) cnt++;
                if (!$scope.item.messages.unequip.room.text) cnt++;
                break;
            case "spam":
                if ($scope.item.category === "spam") {
                    cnt = $scope.remaining("spam-general") + $scope.remaining("spam-messages");
                }
                break;
            case "spam-general":
                if ($scope.item.category === "spam") {
                    if (!$scope.item.messages.spam.command) cnt++;
                    if (!$scope.item.messages.spam.colour) cnt++;
                }
                break;
            case "spam-messages":
                if ($scope.item.category === "spam") {
                    if (!$scope.item.messages.spam.self.text) cnt++;
                    if (!$scope.item.messages.spam.room.text) cnt++;
                    if ($scope.options.targettable && !$scope.item.messages.spam.target.text) cnt++;
                }
                break;
        }

        return cnt;
    };

    $scope.updateItemInformation = () => {
        const maxLineLength = 80;
        $scope.item.identifiers = $scope.temp.identifiers ? $scope.temp.identifiers.split(",") : null;
        $scope.item.long.text = wrapify($scope.temp.long);
        localStorage.setItem("autoload-clothing", JSON.stringify($scope.item));
        //return JSON.stringify($scope.item, null, 80);
        return JSON.stringify($scope.item);
    };
    $scope.preview = () => {
        let result = "", temp = "";
        // const id = $scope.item.identifiers.length > 0 ? ($scope.item.identifiers[0].length > 0 ? $scope.item.identifiers[0] : "clothing") : "clothing";


        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;
        result += `                 <span style="color: yellow;"><</span> <span style="color: white;">Threshold Autoload Clothing Item Previewer</span> <span style="color: yellow;">></span>\n`;
        result += `                   <span style="color: yellow;">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>\n`;
        // result += `123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-`;

        // SHORT DESCRIPTION
        result += "<div><u>Short Description</u></div>";
        if ($scope.item.short.text) {
            const shortDescription = $scope.item.short.text;
            const colour = codeToHex($scope.item.short.colour);
            result += `<div style="color: ${colour};">${shortDescription}</div>`;
        } else result += "\n";

        // LONG DESCRIPTION
        result += "<div><u>Long Description</u></div>";
        if ($scope.item.long.text) {
            const longDescription = $scope.item.long.text || "";
            result += `<div style="color: silver">${longDescription}</div>\n`;
        } else result += "\n";

        // MESSAGES
        // EQUIP
        result += "<div><u>Equip Messages</u></div>";
        if ($scope.item.messages.equip.self.text) {
            const colour = codeToHex($scope.item.messages.equip.colour);
            const equipSelfMessage = iwrapify(substituteMessage($scope.item.messages.equip.self.text, "self", false, $scope.item.short.text, $scope.item.character));
            result += `<em>Self:</em><br /><div style="color: ${colour}">${equipSelfMessage}</div>`;
        }
        if ($scope.item.messages.equip.room.text) {
            const colour = codeToHex($scope.item.messages.equip.colour);
            const equipRoomMessage = iwrapify(substituteMessage($scope.item.messages.equip.room.text, "room", false, $scope.item.short.text, $scope.item.character));
            result += `<div><em>Room:</em></div><div style="color: ${colour}">${equipRoomMessage}</div>`;
        }

        // UNEQUIP
        result += "\n<div><u>Unequip Messages</u></div>";
        if ($scope.item.messages.unequip.self.text) {
            const colour = codeToHex($scope.item.messages.unequip.colour);
            const unequipSelfMessage = iwrapify(substituteMessage($scope.item.messages.unequip.self.text, "self", false, $scope.item.short.text, $scope.item.character));
            result += `<div><em>Self:</em></div><div style="color: ${colour}">${unequipSelfMessage}</div>`;
        }
        if ($scope.item.messages.unequip.room.text) {
            const colour = codeToHex($scope.item.messages.unequip.colour);
            const unequipRoomMessage = iwrapify(substituteMessage($scope.item.messages.unequip.room.text, "room", false, $scope.item.short.text, $scope.item.character));
            result += `<div><em>Room:</em></div><div style="color: ${colour}">${unequipRoomMessage}</div>`;
        }

        // SPAM
        if ($scope.item.category === "spam") {
            result += "\n<div><u>Spam Messages</u></div>";
            if ($scope.item.messages.spam.self.text) {
                const colour = codeToHex($scope.item.messages.spam.colour);
                const spamSelfMessage = iwrapify(substituteMessage($scope.item.messages.spam.self.text, "self", $scope.options.targettable, $scope.item.short.text, $scope.item.character));
                result += `<div><em>Self</em></div><div style="color: ${colour}">${spamSelfMessage}</div>`;
            }
            if ($scope.item.messages.spam.target.text && $scope.options.targettable) {
                const colour = codeToHex($scope.item.messages.spam.colour);
                const spamTargetMessage = iwrapify(substituteMessage($scope.item.messages.spam.target.text, "target", $scope.options.targettable, $scope.item.short.text, $scope.item.character));
                result += `<div><em>Target</em></div><div style="color: ${colour}">${spamTargetMessage}</div>`;
            }
            if ($scope.item.messages.spam.room.text) {
                const colour = codeToHex($scope.item.messages.spam.colour);
                const unequipRoomMessage = iwrapify(substituteMessage($scope.item.messages.spam.room.text, "room", $scope.options.targettable, $scope.item.short.text, $scope.item.character));
                result += `<div><em>Room</em></div><div style="color: ${colour}">${unequipRoomMessage}</div>`;
            }
        }
        // Required to send HTML/CSS to an angular element
        return $sce.trustAsHtml(result);
    };
});
