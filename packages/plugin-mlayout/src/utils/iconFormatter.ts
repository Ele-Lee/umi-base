import * as allIcons from '@ant-design/icons';
import { Antd4Icon } from 'src/typings/typings';

/**
 *
 * @param iconName icon的名字，目前只支持Outlined类别和antd3的名字
 */
export default function formatter(iconName: string): Antd4Icon {
  let trueIconName = '';
  if (/Outlined/.test(iconName)) {
    trueIconName = iconName;
  } else {
    trueIconName = toHump(iconName);
  }
  // @ts-ignore
  return (allIcons[trueIconName] as unknown) as Antd4Icon;
}

/**
 *
 * @param name {string}
 */
function toHump(name: string) {
  const _name = name.replace(name[0], name[0].toUpperCase());
  return _name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}
