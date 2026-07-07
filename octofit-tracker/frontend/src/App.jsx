import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness platform for tracking workouts, teams,
                and progress.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge bg-primary-subtle text-primary-emphasis">
                  React 19
                </span>
                <span className="badge bg-success-subtle text-success-emphasis">
                  Express + TypeScript
                </span>
                <span className="badge bg-info-subtle text-info-emphasis">
                  MongoDB + Mongoose
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
