export default function Home() {
  return (
    <>
      {/* section 1 搜尋區 */}
      <div className="container">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img
              src="https://i.pinimg.com/1200x/c8/c7/a0/c8c7a04cfbf4a5d2a420669f3ca63810.jpg"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">來自自然的祝福手作</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              Carry a seed, carry a blessing.
            </h5>
            <div className="input-group mb-0 mt-4">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder=""
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                >
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* section 2 商品4項 */}
        <div className="row mt-5">
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://i.pinimg.com/736x/03/d2/ea/03d2eae6373170868515703050d3a5c9.jpg"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://i.pinimg.com/736x/03/d2/ea/03d2eae6373170868515703050d3a5c9.jpg"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://i.pinimg.com/736x/03/d2/ea/03d2eae6373170868515703050d3a5c9.jpg"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src="https://i.pinimg.com/736x/03/d2/ea/03d2eae6373170868515703050d3a5c9.jpg"
                className="card-img-top rounded-0"
                alt="..."
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 3 箴言或關於 */}
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://i.pinimg.com/736x/42/21/60/422160101cf1fb73d25f83dbd453c191.jpg"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
      {/* section 找不出的section暫時留著 */}
      <div className="carousel-item">
        <div className="row justify-content-center py-7">
          <div className="col-md-8 d-flex">
            <img
              src="https://i.pinimg.com/avif/1200x/ff/f4/21/fff421ec047a1f8ce38666d80d8a6cf3.avf"
              alt=""
              className="rounded-circle me-5"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
              }}
            />
            <div className="d-flex flex-column">
              <p className="h5">檢查內容</p>
              <p className="mt-auto text-muted">檢查內容</p>
            </div>
          </div>
        </div>
      </div>
      {/* section 4 小圖-標題-文字  */}
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/avif/1200x/f6/71/98/f671980751b7152331583096d541b0b5.avf"
              alt=""
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
              }}
            />
            <h4 className="mt-4">Lorem Ａ</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/03/d9/88/03d988b872a0ad31893906dd71dfd365.jpg"
              alt=""
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
              }}
            />
            <h4 className="mt-4">Lorem Ｂ</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://i.pinimg.com/736x/4c/b2/d2/4cb2d28f8accbd85815cd45c06005e52.jpg"
              alt=""
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
              }}
            />
            <h4 className="mt-4">Lorem Ｃ</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
        </div>
      </div>
      {/* section 5 文字-按鈕  */}
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>Lorem ipsum</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
              <button className="btn btn-dark mt-4 rounded-0">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
