import React from 'react';
import beach from '../../img/banner3.jpg';

function socialLinks(props) {
  let { facebookLink, linkedinLink, twitterLink, pinterestLink } = props;
  return (
    <React.Fragment>
      {/*users social icons */}
      <a
        href={'http://' + facebookLink}
        target="_blank"
        className="social-icons facebook"
      />
      <a
        href={'http://' + twitterLink}
        target="_blank"
        className="social-icons twitter"
      />
      <a
        href={'http://' + linkedinLink}
        target="_blank"
        className="social-icons linkedin"
      />
      <a
        href={'http://' + pinterestLink}
        target="_blank"
        className="social-icons pinterest"
      />
    </React.Fragment>
  );
}

export default socialLinks;
