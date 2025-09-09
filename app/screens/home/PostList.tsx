import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  memo,
} from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../../components/PostCard';

const { height: windowHeight } = Dimensions.get('window');

// ✅ Memoized PostCard to avoid unnecessary re-renders
const MemoPostCard = memo(PostCard, (prevProps, nextProps) => {
  return (
    prevProps.visibleBoxes === nextProps.visibleBoxes &&
    prevProps.postimage[0].image === nextProps.postimage[0].image &&
    prevProps.caption === nextProps.caption
  );
});

const PostList = forwardRef((props: any, ref: any) => {
  const [visibleBoxes, setVisibleBoxes] = useState<any>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshingTop, setRefreshingTop] = useState(false);

  const boxRefs = useRef<any>({});

  // ✅ Fetch posts with token
  const fetchPosts = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // get token from storage
    if (!token) {
      console.warn('No token found, user might not be logged in');
      return;
    }

  const res = await axios.get('http://192.168.1.4:5000/api/get/all/feeds/user', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
    console.log(res)
    const feeds = res.data.feeds || [];
    console.log('API response:', res.data);

    // Map backend → frontend shape
    const mappedFeeds = feeds.map((item: any) => ({
      _id: item.feedId,  
      creatorUsername: item.userName,
      creatorAvatar: item.profileAvatar !== "Unknown" ? item.profileAvatar : null,
      timeAgo: item.timeAgo,
      contentUrl: item.contentUrl,

      // engagement details
      likesCount: item.likesCount || 0,
      commentsCount: item.commentsCount || 0,
      viewsCount: item.viewsCount || 0,
      downloadsCount: item.downloadsCount || 0,
      shareCount: item.shareCount || 0,

      // states
      isLiked: item.isLiked || false,
      isSaved: item.isSaved || false,

      // full comments array is already provided by backend
      comments: item.comments || [],

      // optional values
      caption: item.caption || "",
      tags: item.tags || [],
      background: item.background || "#fff",
    }));

    // ✅ filter for only images (if you want separate image feed)
    const imageFeeds = mappedFeeds.filter((item: any) =>
      item.contentUrl?.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    // ✅ or if you want both images + videos, remove this filter
    setPosts(imageFeeds);

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


  // ✅ Expose methods to parent
  useImperativeHandle(ref, () => ({
    refreshPosts: async () => {
      setRefreshingTop(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await fetchPosts();
      setRefreshingTop(false);
    },
    handleScroll: (e: any) => handleScroll(e),
    handlePull: (e: any) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      if (offsetY < -50 && !refreshingTop) setRefreshingTop(true); // show instantly
      if (offsetY >= 0 && refreshingTop) setRefreshingTop(false); // hide when released
    },
  }));

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      await fetchPosts();
      setLoading(false);
    };
    loadInitial();
  }, []);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const visibleBoxIds = posts
      .map((box) => {
        const boxRef = boxRefs.current[box._id];
        if (!boxRef) return null;
        const boxY = boxRef.y;
        const boxHeight = boxRef.height;
        if (boxY < scrollY + windowHeight / 1.5 && boxY + boxHeight > scrollY) {
          return box._id;
        }
        return null;
      })
      .filter((id) => id !== null);
    setVisibleBoxes(visibleBoxIds);
  };

  const handleBoxLayout = (id: any) => (event: any) => {
    const pageY = event.nativeEvent.layout.y;
    const height = event.nativeEvent.layout.height;
    boxRefs.current[id] = { y: pageY, height };
  };

  const memoVisibleBoxes = useMemo(() => visibleBoxes, [visibleBoxes]);

  if (loading) {
    return (
      <View
        style={{
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View>
      {/* Instant pull-down loader */}
      {refreshingTop && (
        <View
          style={{
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="small" color="#000" />
        </View>
      )}

      {posts.map((post: any) => (
        <View
          key={post._id}
          onLayout={handleBoxLayout(post._id)}
          style={{ height: windowHeight, width: '100%' }}
        >
          <MemoPostCard
            id={post._id}
            name={post.creatorUsername || 'Ashik'}
            profileimage={post.creatorAvatar || null}
            date={post.timeAgo}
            postimage={[{ image: post.contentUrl }]}
            like={post.likes?.length || 0}
            comment={post.comments?.length || 0}
            posttitle={post.caption}
            posttag={post.tags?.join(' ')}
            sheetRef={props.sheetRef}
            optionSheet={props.optionSheet}
            hasStory={false}
            reelsvideo={null}
            caption={post.caption}
            background={post.background || '#fff'}
            visibleBoxes={memoVisibleBoxes}
          />
        </View>
      ))}
    </View>
  );
});

export default PostList;
