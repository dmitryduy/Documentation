import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Input from '@shared/Input/Input';
import { useInput } from '@hooks/useInput';
import { useDebounce } from '@hooks/useDebounce';
import Loader from '@shared/Loader/Loader';
import { useClickOutside } from '@hooks/useClickOutside';
import { useStores } from '@hooks/useStores';

import {SearchPostStyled, Results} from './SearchPost.styles';
import { useFindPosts } from './SearchPost.hook/useFindPosts';

const SearchPost = observer(() => {
  const [value, setValue] = useInput('');
  const debouncedValue = useDebounce(value, 300);
  const {authStore: {login}} = useStores();
  const {isLoading, postsInfo, clearPostsInfo} = useFindPosts(debouncedValue);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => clearPostsInfo());

  const clearSearch = () => {
    setValue('');
    clearPostsInfo();
  };

  return (
    <SearchPostStyled ref={ref}>
      <Input value={value} setValue={setValue} placeholder="Поиск" type="text"/>
      {postsInfo && <Results>
        {isLoading ?
          <Loader/> :
          !postsInfo.length ?
            <p>Результатов нет</p> :
            postsInfo.map(post =>
              <Link onClick={clearSearch} key={post.link} to={`/article/${post.link}`}>
                {post.title}
                {post.owner === login && <span className="my-post">моя</span>}
              </Link>)}
      </Results>}
    </SearchPostStyled>
  );
});

export default SearchPost;