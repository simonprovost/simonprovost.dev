import React from 'react';
import {useParams} from 'react-router-dom';
import {NotionRenderer} from 'react-notion-x';
import {Code} from 'react-notion-x/build/third-party/code';
import {Equation} from 'react-notion-x/build/third-party/equation';
import {Modal} from 'react-notion-x/build/third-party/modal';
import {Pdf} from 'react-notion-x/build/third-party/pdf';
import useNotionPage from '../../hooks/useNotionPage';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import './blogPost.css';
import SnakeEffectContainer from "../snakeEffect/snakeEffect";
import AcademiaHeader from "../academiaHeader/academiaHeader";
import RiveLoader from "../riveLoader/riveLoader";

const mapPageUrl = (id) => `https://www.notion.so/${id.replace(/-/g, '')}`;

const formatTitle = (slug) => {
    if (!slug) return 'Untitled Article';
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const BlogPost = ({showDetails = true}) => {
    const {id: pageId, title} = useParams();
    const {recordMap, isLoading, error} = useNotionPage(pageId);

    const formattedTitle = formatTitle(decodeURIComponent(title));

    if (isLoading) {
        return (
            <div className="blogPost__loader-container">
                <RiveLoader src="rive/loader.riv" className="blogPost__loader"/>
                <p className="loader-text">Loading your article...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">An error occurred while loading the article.</p>
                <p className="error-details">{error.message}</p>
            </div>
        );
    }

    if (!recordMap) {
        return (
            <div className="error-container">
                <p className="error-message">The article you're looking for could not be found.</p>
            </div>
        );
    }

    const handleCompassClick = () => {
        window.open('/Blog', '_self');
    };

    return (
        <div className="blogPost__main_container">
            <div className="blogPost__header-and-content-container">
                <div className="blogPost__header-and-content">
                    <AcademiaHeader
                        name={formattedTitle}
                        positions={[]}
                        tabs={[]}
                        showInfo={false}
                        showTabs={false}
                        showTitle={formattedTitle}
                        onCompassClick={handleCompassClick}
                        onTabClick={() => {
                        }}
                        positionIndex={0}
                        snakeEffectProps={{
                            duration: 0.3,
                            delayIncrement: 0.08,
                            initialDelayRatio: 1,
                        }}
                    />
                    {showDetails && (
                        <div className="blogPost__content-container">
                            <SnakeEffectContainer
                                duration={0.5}
                                delayIncrement={0.05}
                                initialDelay={0.1}
                                applyToSubchildren={true}
                                parentStyle="parent-container-absolute"
                                childStyle="child-without-transform"
                            >
                                <div className="blogPost__content">
                                    <NotionRenderer
                                        recordMap={recordMap}
                                        fullPage={false}
                                        darkMode={false}
                                        disableHeader={true}
                                        hideBlockId={true}
                                        showTableOfContents={false}
                                        isImageZoomable={true}
                                        showCollectionViewDropdown={false}
                                        linkTableTitleProperties={false}
                                        isLinkCollectionToUrlProperty={false}
                                        mapPageUrl={mapPageUrl}
                                        components={{
                                            Code,
                                            Equation,
                                            Pdf,
                                            Modal,
                                        }}
                                    />
                                </div>
                            </SnakeEffectContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
