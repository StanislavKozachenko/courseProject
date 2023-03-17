import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={349}
    height={585}
    viewBox="0 0 349 585"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="292" rx="0" ry="0" width="280" height="28" />
    <rect x="0" y="339" rx="0" ry="0" width="282" height="113" />
    <rect x="136" y="475" rx="26" ry="26" width="152" height="52" />
    <rect x="0" y="477" rx="0" ry="0" width="98" height="47" />
    <rect x="48" y="38" rx="20" ry="20" width="174" height="223" />
  </ContentLoader>
);

export default Skeleton;
