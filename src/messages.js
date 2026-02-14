const substituteMessage = (mess, audience, targetted, short, character, target = { name: "Teleifegorra", gender: "female" }) => {
    const capitalize = (lc) => {
        if(lc === null || lc === undefined || !lc.length) return "";
        return lc.charAt(0).toUpperCase() + lc.slice(1);
    };

    const myGenderData = findGenderInformation(character.gender) || findGenderInformation("male");
    const targetGenderData = findGenderInformation(target.gender) || findGenderInformation("male");

    mess = mess.replace(/SHORT/g, short);

    switch (audience) {
        case "self":
            if (targetted === true) {
                mess = mess.replace(/\^VNAME/g, target.name);
                mess = mess.replace(/\^VPOSS/g, capitalize(targetGenderData.poss));
                mess = mess.replace(/\^VOBJ/g,  capitalize(targetGenderData.obj));
                mess = mess.replace(/\^VSUB/g,  capitalize(targetGenderData.sub));

                mess = mess.replace(/VNAME/g, target.name);
                mess = mess.replace(/VPOSS/g, targetGenderData.poss);
                mess = mess.replace(/VOBJ/g,  targetGenderData.obj);
                mess = mess.replace(/VSUB/g,  targetGenderData.sub);
            }

            mess = mess.replace(/\^NAME/g, "You");
            mess = mess.replace(/\^SUB/g,  "You");
            mess = mess.replace(/\^OBJ/g,  "You");
            mess = mess.replace(/\^POSS/g, "Your");

            mess = mess.replace(/NAME/g, "you");
            mess = mess.replace(/SUB/g,  "you");
            mess = mess.replace(/OBJ/g,  "you");
            mess = mess.replace(/POSS/g, "your");
            break;
        case "target":
            if (targetted === true) {
                mess = mess.replace(/\^VNAME/g, "You");
                mess = mess.replace(/\^VSUB/g,  "You");
                mess = mess.replace(/\^VOBJ/g,  "You");
                mess = mess.replace(/\^VPOSS/g, "Your");

                mess = mess.replace(/VNAME/g, "you");
                mess = mess.replace(/VSUB/g,  "you");
                mess = mess.replace(/VOBJ/g,  "you");
                mess = mess.replace(/VPOSS/g, "your");
            }

            mess = mess.replace(/\^NAME/g, character.name);
            mess = mess.replace(/\^SUB/g,  capitalize(myGenderData.sub));
            mess = mess.replace(/\^OBJ/g,  capitalize(myGenderData.obj));
            mess = mess.replace(/\^POSS/g, capitalize(myGenderData.poss));

            mess = mess.replace(/NAME/g, character.name);
            mess = mess.replace(/SUB/g,  myGenderData.sub);
            mess = mess.replace(/OBJ/g,  myGenderData.obj);
            mess = mess.replace(/POSS/g, myGenderData.poss);
            break;
        case "room":
            if (targetted === true) {
                mess = mess.replace(/\^VNAME/g, target.name);
                mess = mess.replace(/\^VPOSS/g, capitalize(targetGenderData.poss));
                mess = mess.replace(/\^VOBJ/g,  capitalize(targetGenderData.obj));
                mess = mess.replace(/\^VSUB/g,  capitalize(targetGenderData.sub));

                mess = mess.replace(/VNAME/g, target.name);
                mess = mess.replace(/VPOSS/g, targetGenderData.poss);
                mess = mess.replace(/VOBJ/g,  targetGenderData.obj);
                mess = mess.replace(/VSUB/g,  targetGenderData.sub);
            }

            mess = mess.replace(/\^NAME/g, character.name);
            mess = mess.replace(/\^SUB/g,  capitalize(myGenderData.sub));
            mess = mess.replace(/\^OBJ/g,  capitalize(myGenderData.obj));
            mess = mess.replace(/\^POSS/g, capitalize(myGenderData.poss));

            mess = mess.replace(/NAME/g, character.name);
            mess = mess.replace(/SUB/g,  myGenderData.sub);
            mess = mess.replace(/OBJ/g,  myGenderData.obj);
            mess = mess.replace(/POSS/g, myGenderData.poss);
            break;
    }
    return mess;
};
