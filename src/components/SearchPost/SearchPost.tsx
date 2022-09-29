import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../shared/Input/Input';
import { useInput } from '../../hooks/useInput';
import { useDebounce } from '../../hooks/useDebounce';
import Loader from '../../shared/Loader/Loader';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAuth } from '../../hooks/useAuth';

import {SearchPostStyled, Results} from './SearchPost.styles';
import { useFindPosts } from './SearchPost.hook/useFindPosts';

const SearchPost = () => {
  const [value, setValue] = useInput('');
  const debouncedValue = useDebounce(value, 300);
  const {login} = useAuth();
  const {isLoading, postsInfo, clearPostsInfo} = useFindPosts(debouncedValue);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => clearPostsInfo());

  const clearSearch = () => {
    setValue('');
    clearPostsInfo();
  };

  return (
    <SearchPostStyled ref={ref}>
      <Input value={value} setValue={setValue} placeholder="Поиск"/>
      {postsInfo && <Results>
        {isLoading ?
          <Loader/> :
          postsInfo?.length === 0 ?
            <p>Результатов нет</p> :
            postsInfo?.map(post =>
              <Link onClick={clearSearch} key={post.link} to={`/post/${post.link}`}>
                {post.title}
                {post.owner === login && <span className="my-post">моя</span>}
              </Link>)}
      </Results>}
    </SearchPostStyled>
  );
};

export default SearchPost;