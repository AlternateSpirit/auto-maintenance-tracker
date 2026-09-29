type SettingsProps = {
  exportData: () => void
  clearAllData: () => void
}

function Settings({ exportData, clearAllData }: SettingsProps) {
  return (
    <div className="app settings-page">
      <span className="eyebrow">Preferences and privacy</span>
      <h1>Settings</h1>
      <p>Manage your Garage data while the app is in alpha.</p>

      <section className="settings-grid">
        <div className="card settings-card">
          <span className="settings-icon" aria-hidden="true">↓</span>
          <h2>Export your garage</h2>
          <p>
            Download a JSON backup containing your vehicles, service records,
            and reminders.
          </p>
          <button type="button" onClick={exportData}>Export Data</button>
        </div>

        <div className="card settings-card danger-card">
          <span className="settings-icon" aria-hidden="true">×</span>
          <h2>Clear local data</h2>
          <p>
            Permanently remove every vehicle, service record, and reminder
            stored in this browser.
          </p>
          <button
            className="danger-button"
            type="button"
            onClick={clearAllData}
          >
            Clear All Data
          </button>
        </div>
      </section>

      <section className="card alpha-note">
        <span className="eyebrow">Alpha release</span>
        <h2>Cloud sync is coming next</h2>
        <p>
          Service Bay currently keeps data on this device. Accounts and secure
          cross-device storage are planned for a future release.
        </p>
      </section>
    </div>
  )
}

export default Settings
