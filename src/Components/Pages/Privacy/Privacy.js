import React from 'react';

const Privacy = () => {
  return (
    <div className="privacyContainer">
      <h4>Cookies</h4>
      <p>
        This website stores only technical information on your browser to grant you a bettere user exprerience.
        This information is regarding your preferences and we do not collect any personal information.
      </p>
      <p>
        This website do not use a normal cookie but ask access to the Local storage of your browser, this behaviour do not require preventive blocking as for the prefereces cookies.
      </p>
      <p>
        Using the editor of this website with external links could set some third party cookie on your browser.
      </p>
      <p>
        If you want more information on how to block or remove cookies or stored information directly from your browser:
      </p>
      <ul>
        <li><a href="http://windows.microsoft.com/it-it/windows-vista/block-or-allow-cookies">Internet Explorer</a></li>
        <li><a href="https://privacy.microsoft.com/it-it/windows-10-microsoft-edge-and-privacy">Microsoft Edge</a></li>
        <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie">Firefox</a></li>
        <li><a href="https://support.apple.com/kb/PH19214?viewlocale=it_IT&locale=en_US">Safari</a></li>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies">Chrome</a></li>
      </ul>
    </div>
  )
}

export default Privacy;
