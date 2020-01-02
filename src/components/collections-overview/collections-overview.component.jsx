import React from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './collections-overview.styles.scss';

const CollectionOverview = ({ collections }) => (
    <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);