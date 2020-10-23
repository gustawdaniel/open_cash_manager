import { MODAL_CLOSE, ModalBus } from '../../helpers/modalBus';

export const modalMixin = {
  mounted() {
    UIkit.modal(this.$refs.modal).show();
    this.$refs.modal.addEventListener('hidden', () => {
      ModalBus.$emit(MODAL_CLOSE);
    });
  },
}