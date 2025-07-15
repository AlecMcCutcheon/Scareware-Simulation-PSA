import React from 'react';

interface EducationalInfoProps {
  onClose: () => void;
}

const EducationalInfo: React.FC<EducationalInfoProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content dark-mode" onClick={(e) => e.stopPropagation()}>
        <h2>📚 Scareware Education & Safety Guide</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3>What is Scareware?</h3>
          <p>
            Scareware is malicious software that uses social engineering to trick users into 
            believing their computer is infected with viruses or has other security problems. 
            It then offers fake solutions to "fix" these non-existent problems.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Common Scareware Techniques</h3>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li><strong>Fake Security Alerts:</strong> Pop-ups claiming your system is infected</li>
            <li><strong>Fake System Scans:</strong> Simulated virus scans showing fake threats</li>
            <li><strong>Browser Hijacking:</strong> Taking control of your browser</li>
            <li><strong>Fullscreen Overlays:</strong> Blocking access to close or navigate away</li>
            <li><strong>Urgency Tactics:</strong> Creating false time pressure</li>
            <li><strong>Fake Official Branding:</strong> Impersonating legitimate security companies</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>How to Identify Real Scareware</h3>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>⚠️ Unexpected pop-ups claiming system infections</li>
            <li>⚠️ Demands for immediate payment to "fix" problems</li>
            <li>⚠️ Inability to close browser windows or tabs</li>
            <li>⚠️ Fake system scans that appear without your permission</li>
            <li>⚠️ Threats of data loss or legal action</li>
            <li>⚠️ Poor grammar or spelling in official-looking messages</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>How to Escape Real Scareware</h3>
          <div className="escape-info">
            <h4>Immediate Actions:</h4>
            <ol style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
              <li><strong>Don't Panic:</strong> Stay calm and don't click anything</li>
              <li><strong>Force Close:</strong> Use Ctrl+Alt+Delete (Windows) or Cmd+Option+Esc (Mac)</li>
              <li><strong>Task Manager:</strong> End browser processes</li>
              <li><strong>Safe Mode:</strong> Restart in safe mode if needed</li>
              <li><strong>Professional Help:</strong> Contact IT support or use legitimate antivirus</li>
            </ol>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Prevention Tips</h3>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>✅ Keep your operating system and software updated</li>
            <li>✅ Use legitimate antivirus software</li>
            <li>✅ Be cautious of unexpected pop-ups</li>
            <li>✅ Don't click on suspicious links</li>
            <li>✅ Enable pop-up blockers</li>
            <li>✅ Use ad-blocking extensions</li>
            <li>✅ Never pay for "security fixes" from pop-ups</li>
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Legitimate Security Software</h3>
          <p>
            Only use security software from well-known, legitimate companies like:
            Microsoft Defender, Malwarebytes, Norton, McAfee, or Kaspersky.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="button button-primary" onClick={onClose}>
            Got it! Let's Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalInfo; 