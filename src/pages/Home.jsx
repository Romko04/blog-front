import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postsSlice';
import { PostSkeleton } from '../components/Post/Skeleton';
import { useLocation, useNavigate } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();
  const { posts, isLoading } = useSelector((state) => state.posts)
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get('sortby') ?? 'date';

  const navigate = useNavigate()

  const tabs = [
    { label: 'Новые', value: 'date' },
    { label: 'Популярные', value: 'popular' },
  ];
  const initialActiveTab = tabs.findIndex(tab => tab.value === sortBy);

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabChange = (sortBy, index)=>{
    setActiveTab(index)
    const tabPath = index === 0 ? 'date' : 'popular';
    navigate(`?sortby=${tabPath}`);
    dispatch(fetchPosts(sortBy))
  }


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts(sortBy || 'date'))
  }, [sortBy])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab} aria-label="basic tabs example">
        {tabs.map((tab, index) => (
          <Tab key={index} onClick={() => handleTabChange(tab.value, index)} label={tab.label} />
        ))}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading ? (
            [...Array(5)].map((_,index) => (
              <PostSkeleton key={index} />
            ))
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl}
                user={{
                  avatarUrl:
                    post.user.userAvatar,
                  fullName: post.user.username,
                }}
                createdAt={'12 июня 2022 г.'}
                viewsCount={post.viewsCount}
                commentsCount={post.comments.length}
                tags={post.tags}
                isEditable
              />
            ))
          )}

        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
