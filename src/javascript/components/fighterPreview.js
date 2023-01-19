import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  // my code
  let fighterImage = createFighterImage(fighter);

  const fighterElementInfo = createElement({
    tagName: 'h2',
    className: `fighter-preview___info ${positionClassName}`
  });
  fighterElementInfo.innerHTML = '<span style="color:white">Fighter';

  const fighterList = createElement({
    tagName: 'ul',
    className: `fighter-preview___list ${positionClassName}`
  });

  for (const [key, value] of Object.entries(fighter)) {
    if (key == '_id' || key == 'source') {
      continue;
    }
    const itemInfo = createElement({
      tagName: 'li',
      className: `fighter-preview__item  ${positionClassName}`,
      attributes: {
        textContent: `<span>${key}: </span> ${value}`,
      }
    });    
    itemInfo.innerHTML = `<span style="color:white">${key}:  ${value}</span>`;

    fighterList.append(itemInfo);
  }

  fighterElement.append(fighterImage);
  fighterElement.append(fighterElementInfo);
  fighterElement.append(fighterList);
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
