import { Link } from "react-router";

export default function CheckoutFlow({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: "購物車", path: "/cart" },
    { id: 2, label: "結帳頁面", path: "/checkout" },
    { id: 3, label: "訂單送出", path: "/order-success" },
  ];

  return (
    <div className="position-relative d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
              <h2 className="navbar-brand font-zh-display fw-bold">
                結帳流程 <i className="bi bi-chevron-right"></i>
              </h2>
              <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                {steps.map((step, index) => {
                  const isCompleted =
                    currentStep > step.id ||
                    (currentStep === steps.length && step.id === currentStep);
                  const isCurrent = currentStep === step.id;

                  return (
                    <li
                      key={step.id}
                      className="d-flex align-items-center position-relative"
                    >
                      <div className="text-center">
                        {isCompleted ? (
                          <i className="bi bi-check-circle-fill text-success"></i>
                        ) : isCurrent ? (
                          <i className="bi bi-record-circle-fill text-dark"></i>
                        ) : (
                          <i className="bi bi-record-circle text-secondary"></i>
                        )}

                        <div className="mt-1">
                          {step.id < currentStep ? (
                            <Link
                              to={step.path}
                              className="text-decoration-none"
                            >
                              {step.label}
                            </Link>
                          ) : (
                            <span
                              className={
                                isCurrent ? "fw-bold text-dark" : "text-muted"
                              }
                            >
                              {step.label}
                            </span>
                          )}
                        </div>
                      </div>

                      {index !== steps.length - 1 && (
                        <span className="mx-3 text-muted">
                          <i className="bi bi-chevron-right"></i>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
