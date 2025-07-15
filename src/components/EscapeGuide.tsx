import React from 'react';

interface EscapeGuideProps {
  onRestart: () => void;
  onStop: () => void;
}

const EscapeGuide: React.FC<EscapeGuideProps> = ({ onRestart, onStop }) => {
  // Use safe mode - no browser hijacking applied
  // const { blockedAttempts, isFullscreen } = useSafeMode();
  return (
    <div className="simulation-content escape-controls safe-zone dark-mode">
      <div className="escape-info">
        <p>
          Here's what you should do if you encounter real scareware:
        </p>

      </div>

      <div style={{ margin: '2rem 0' }}>
        <h3>🚨 Immediate Actions (Real Scareware)</h3>
        <div className="escape-info">
          <h4>Step 1: Don't Panic</h4>
          <p>
            Stay calm. Scareware relies on fear to make you act impulsively. 
            Take a deep breath and think clearly.
          </p>
          
          <h4>Step 2: Don't Click Anything</h4>
          <p>
            Do NOT click on any pop-ups, download anything, or call any numbers 
            displayed on the screen.
          </p>
          
          <h4>Step 3: Force Close the Browser</h4>
          <ul className="escape-steps">
            <li><strong>Windows:</strong> Press Ctrl + Alt + Delete, then End Task for your browser</li>
            <li><strong>Mac:</strong> Press Cmd + Option + Esc, then Force Quit your browser</li>
            <li><strong>Alternative:</strong> Close the browser from the taskbar/dock</li>
          </ul>
          
          <h4>Step 4: Restart in Safe Mode (if needed)</h4>
          <ul className="escape-steps">
            <li><strong>Windows:</strong> Restart and press F8 during boot</li>
            <li><strong>Mac:</strong> Restart and hold Shift during boot</li>
          </ul>
          
          <h4>Step 5: Run Legitimate Antivirus</h4>
          <ul className="escape-steps">
            <li>Use Windows Defender (built-in)</li>
            <li>Download Malwarebytes (free version)</li>
            <li>Use other trusted antivirus software</li>
          </ul>
        </div>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <h3>🔍 How to Identify Real Scareware</h3>
        <div style={{ 
          background: '#3d2f1f', 
          border: '2px solid #ffc107', 
          borderRadius: '8px', 
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <h4>Red Flags to Watch For:</h4>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>⚠️ Unexpected pop-ups claiming system infections</li>
            <li>⚠️ Demands for immediate payment</li>
            <li>⚠️ Inability to close browser windows</li>
            <li>⚠️ Fake system scans you didn't initiate</li>
            <li>⚠️ Threats of data loss or legal action</li>
            <li>⚠️ Poor grammar or spelling in "official" messages</li>
            <li>⚠️ Phone numbers or payment demands</li>
            <li>⚠️ Urgency tactics ("Act now or lose everything!")</li>
          </ul>
        </div>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <h3>✅ Prevention Tips</h3>
        <div style={{ 
          background: '#1a2f35', 
          border: '2px solid #17a2b8', 
          borderRadius: '8px', 
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>✅ Keep your operating system updated</li>
            <li>✅ Use legitimate antivirus software</li>
            <li>✅ Enable pop-up blockers</li>
            <li>✅ Use ad-blocking browser extensions</li>
            <li>✅ Be cautious of unexpected downloads</li>
            <li>✅ Don't click on suspicious links</li>
            <li>✅ Use strong, unique passwords</li>
            <li>✅ Enable two-factor authentication</li>
            <li>✅ Regularly backup important data</li>
          </ul>
        </div>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <h3>📞 When to Get Professional Help</h3>
        <div style={{ 
          background: '#3d1f1f', 
          border: '2px solid #dc3545', 
          borderRadius: '8px', 
          padding: '1.5rem',
          margin: '1rem 0'
        }}>
          <p><strong>Contact IT support or a computer professional if:</strong></p>
          <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
            <li>You can't close the browser or pop-ups</li>
            <li>Your computer is running very slowly</li>
            <li>You notice unauthorized charges on your accounts</li>
            <li>Your antivirus software is disabled</li>
            <li>You're unsure if the threat is real</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h3>🎓 What You've Learned</h3>
        <p>
          You now understand how scareware works and how to protect yourself. 
          Remember: knowledge is your best defense!
        </p>
        
        <div style={{ marginTop: '2rem' }}>
          <button 
            className="button button-primary" 
            onClick={onRestart}
            style={{ marginRight: '1rem' }}
          >
            🔄 Restart Simulation
          </button>

          <button 
            className="button button-danger" 
            onClick={onStop}
          >
            🏠 Exit to Home
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#1f3d1f', 
        border: '2px solid #28a745', 
        borderRadius: '8px', 
        padding: '1.5rem',
        marginTop: '2rem'
      }}>
        <h4>💡 Key Takeaways</h4>
        <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
          <li><strong>Stay Calm:</strong> Don't let fear control your actions</li>
          <li><strong>Don't Pay:</strong> Never pay for "security fixes" from pop-ups</li>
          <li><strong>Use Legitimate Tools:</strong> Only trust well-known security software</li>
          <li><strong>Get Help:</strong> When in doubt, contact professionals</li>
          <li><strong>Prevention:</strong> Good security habits prevent most problems</li>
        </ul>
      </div>
    </div>
  );
};

export default EscapeGuide; 