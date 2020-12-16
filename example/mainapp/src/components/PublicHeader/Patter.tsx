import React, {
  FunctionComponent,
  CSSProperties,
  useMemo,
  useEffect,
} from 'react';
import uniq from 'lodash/uniq';

import PatterPanel from '@guorou-knowledge/panel';
import { unVisibleMainPage$ } from '@guorou-knowledge/panel/dist/helpers/stat';

import useUserInfoSelector from 'src/lib/hooks/selectors/useUserInfoSelector';
import { UserOrganize } from 'src/typings/Auth';

const teacherTags = '续费链接/老师介绍/课表/高端班入门测/各年级课程价格表/课程大纲/标兵分享'.split(
  '/',
);
const operateTags = '9元课课表/寒假课表/春季课表/9元课课纲/寒假课纲/春季课纲/老师介绍/报名链接/老师讲课视频'.split(
  '/',
);

type IPatterBasicAliased = any;

const Patter: FunctionComponent<Props> = ({ onUsePatter }) => {
  const userInfo = useUserInfoSelector();

  const searchTags = useMemo(() => {
    let tags: any[] = [];
    const { portal_organize } = userInfo;

    if (portal_organize.includes(UserOrganize.Opearte)) {
      tags = [...operateTags];
    }

    if (portal_organize.includes(UserOrganize.Teacher)) {
      tags = [...tags, ...teacherTags];
    }

    return uniq(tags.filter(e => e));
  }, [userInfo]);

  useEffect(() => {
    return function rest() {
      unVisibleMainPage$.next(Date.now());
    };
  }, [null]);

  return <PatterPanel handleUse={onUsePatter} searchTags={searchTags} />;
};

export type OnUsePatter = (patter: IPatterBasicAliased) => void;

export type PatterType = IPatterBasicAliased;

export interface Props {
  className?: string;
  style?: CSSProperties;
  tagType?: string;
  entry?: string;
  showAllTages?: boolean;
  onUsePatter?: OnUsePatter;
}

export default Patter;
