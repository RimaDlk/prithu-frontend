import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Reelsitem from '../../components/Reelsitem';
import Header from '../../layout/Header';
import PostShareSheet from '../../components/bottomsheet/PostShareSheet';

const Reels = () => {
  const sheetRef = useRef<any>();
  const [reelsData, setReelsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get('http://192.168.1.77:5000/api/all/feeds');
        // ✅ Only keep videos
        const videoFeeds = res.data.feeds.filter((feed: any) => feed.type === 'video');
        setReelsData(videoFeeds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Header title="Reels" transparent={true} />

      <Swiper
        horizontal={false}
        loop={false}
        autoplay={false} // ❌ No auto scroll
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={(index) => setCurrentIndex(index)} // ✅ track visible index
      >
        {reelsData.map((data, index) => (
          <Reelsitem
            key={index}
            like={data.likesCount}
            comment={data.commentsCount || 0}
            save={data.downloadsCount}
            send={0}
            image={data.createdBy?.profilePic || null}
            holder={data.createdBy?.name || 'Ashik'}
            text={data.caption || ''}
            music={data.music || 'Unknown'}
            sheetRef={sheetRef}
            reelsvideo={{ uri: data.contentUrl }}
            hasStory={false}
            autoplay={currentIndex === index} // ✅ only play current
          />
        ))}
      </Swiper>

      <PostShareSheet ref={sheetRef} />
    </SafeAreaView>
  );
};

export default Reels;
