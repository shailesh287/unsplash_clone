import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { getPhotos, getRandomPhotos, searchPhotos } from '../galleryState.js';
  import './gallerystyle.css';

  const Gallery = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const photos = useSelector((state) => state.gallery.photos);
    const isLoading = useSelector((state) => state.gallery.isLoading);
    const randomPhoto = useSelector((state) => state.gallery.randomPhoto);

    useEffect(() => {
      dispatch(getPhotos(page));
    }, [dispatch, page]);

    useEffect(() => {
      dispatch(getRandomPhotos());
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollBottom = scrollTop + windowHeight + 150;
        if (scrollBottom >= documentHeight && !isLoading) {
          if (searchResults.length === 0) {
            setPage((prevpage) => prevpage+1)
            // dispatch(getPhotos(page+1));
          } else {
            dispatch(searchPhotos({ searchTerm: searchQuery, page: page + 1 }));
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isLoading, setPage, searchQuery, searchResults]);

    const debouncedSearch = debounce(() => {
      dispatch(searchPhotos({ searchTerm: searchQuery, page })).then((results) => {
        setSearchResults(results);
      });
    }, 500);
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        debouncedSearch();
      }
    };
    const handleSearch = () => {
      debouncedSearch();
    };
    useEffect(() => {
      if (searchQuery) {
        dispatch(searchPhotos({ searchTerm: searchQuery, page })).then((results) => {
          setSearchResults(results);
        });
      } else {
        setSearchResults([]);
      }
    }, [dispatch, searchQuery, page]);

    const handleClose = () => {
      setSearchResults([]);
      setSearchQuery('');
    };

    return (
      <>
        <div
          className="random-photo-container"
          style={{ backgroundImage: `url(${randomPhoto?.urls?.regular})` }}
        >
          <div className="text">
            <h1>Unsplash</h1>
            <p>
              The internet’s source of freely-usable images. <br /> Powered by creators everywhere.
            </p>
          </div>
          <div className="search-bar">
            <button onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search photos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            {searchQuery.length > 0 ? (
              <button onClick={handleClose}>
                <span style={{ fontSize: "20px" }}>X</span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
    
        <div className="gallery">
          {searchQuery.length > 0 && searchResults.payload !== undefined
            ? searchResults?.payload.map((photo) => (
                <div key={`${photo.id}-img`} className="image-container">
                  <img
                    src={photo.urls.regular}
                    alt={photo.description}
                    className="image"
                  />
                  <div className="image-overlay" key={`${photo.id}-overlay`}>
                    <div className="image-user">
                      <img
                        src={photo.user.profile_image.medium}
                        alt={photo.user.name}
                        className="user-image"
                      />
                      <div
                        className="user-details"
                        key={`${photo.id}-user-details`}
                      >
                        <span className="username">{photo.user.username}</span>
                        <span className="name">{photo.user.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : photos.map((photo) => (
                <div key={`${photo.id}-img`} className="image-container">
                  <img
                    src={photo.urls.regular}
                    alt={photo.description}
                    className="image"
                  />
                  <div className="image-overlay" key={`${photo.id}-overlay`}>
                    <div className="image-user">
                      <img
                        src={photo.user.profile_image.medium}
                        alt={photo.user.name}
                        className="user-image"
                      />
                      <div
                        className="user-details"
                        key={`${photo.id}-user-details`}
                      >
                        <span className="username">{photo.user.username}</span>
                        <span className="name">{photo.user.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          {isLoading && <p>Loading more photos...</p>}
        </div>
      </>
    );
    
  };

  export default Gallery;
