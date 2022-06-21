import { Modal as AntdModal } from "antd";
import { useUpdate } from "react-use";
import Success from "./Success";
import Error from "./Error";

let forceUpdate: any = null;
let modalList: any[] = [];

function Modal() {
  forceUpdate = useUpdate();

  return (
    <>
      {modalList.map((props: any, i: number) => (
        <AntdModal zIndex={9998} key={i} {...props} />
      ))}
    </>
  );
}

Modal.show = function (children: JSX.Element, options?: any) {
  return new Promise<any>((resolve) => {
    const modalId = Date.now();
    const Component = children.type;
    modalList.push({
      modalId,
      visible: true,
      footer: null,
      children: (
        <Component
          {...children.props}
          onSubmit={(data: any) => {
            Modal._hidden(modalId);
            resolve(data);
          }}
          onCancel={() => {
            Modal._hidden(modalId);
            resolve(null);
          }}
        />
      ),
      onCancel: () => {
        Modal._hidden(modalId);
        resolve(null);
      },
      ...options,
    });

    forceUpdate();
  });
};
Modal.success = function (tips: string) {
  Modal.show(<Success tips={tips} />, {
    closable: false,
    className: "popup-tips",
  });
};
Modal.error = function (tips: string) {
  Modal.show(<Error tips={tips} />, {
    closable: false,
    className: "popup-tips",
  });
};

Modal._hidden = function (modelId: number) {
  let modal = modalList.find((d) => d.modalId == modelId);
  if (modal) {
    modal.visible = false;
    forceUpdate();

    setTimeout(() => {
      let index = modalList.findIndex((d) => d.modalId == modelId);
      index >= 0 && modalList.splice(index, 1) && forceUpdate();
    }, 0);
  }
};

Modal.clear = function () {
  modalList = [];
  forceUpdate();
};

export default Modal;
