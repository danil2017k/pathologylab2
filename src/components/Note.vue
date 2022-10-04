<template lang="html">
    <div class="note-container" :id="object.id">
     <div v-if="type === 'mark'" :class="{'mark': true, 'selected': opened}" @touchstart.stop="ableToAct ? toggleOpened() : null" @click="ableToAct ? toggleOpened() : null" ref="mark"></div>
        <div v-else :class="{'ruler-length': true, 'selected': opened}" style="visibility:visible" @touchstart.stop="ableToAct ? toggleOpened() : null" @click="toggleOpened()" ref="ruler">{{ object.length }}</div>
        <div :class="{'comment-form': true, 'visible': opened}" :style="commentStyles" ref="comment" @click.stop @pointerdown.stop @mousedown.stop>
            <div class="comment-author">
                <!-- <div :class="{'avatar': true, 'default': !object.author.photo}" :style="accountAvatar"></div> -->
                <p class="name">{{ object.author.name }}</p>
            </div>
            <div class="editor-container">
                <div class="editor" :class="{'center-placeholder': !isNoteOwner && (!object.text || !object.text.length) && empty}" @touchstart.stop="$refs.text.focus(); focused = true;" @click="$refs.text.focus(); focused = true;">
                    <span class="text multiline" :class="{'focused':focused}" :contenteditable="isEditable && isNoteOwner" ref="text" @paste="cleanPaste" @keyup="onKeyUp" @blur="editNote">{{ object.text }}</span>
                    <span class="placeholder" v-if="(!object.text || !object.text.length) && empty && !focused">{{ commentPlaceholder }}</span>
                </div>
            </div>
            <div class="date">
                {{ object.date | momentRelative }}
            </div>
            <button v-if="isEditable" @touchstart.stop="deleteNote" @click="deleteNote" class="delete-comment">
            <!-- {{ $t('case.viewer.note.delete_comment', { type: type === 'mark' ? $tc('case.viewer.note.mark', 1) : $tc('case.viewer.note.ruler', 1) }) }} -->
            delete
          </button>
        </div>
    </div>
</template>

<!-- eslint-disable vue/multi-word-component-names -->

<script>
import { mapActions, mapState } from 'vuex'
import { cleanPaste } from '../utils'
import { Archived } from '../dictionaries/availableCaseStatuses'
import OpenSeadragon from 'openseadragon'
window.OpenSeadragon = OpenSeadragon
require('../libs/openseadragon-svg-overlay')
// const viewer = new OpenSeadragon.Viewer();
window.OpenSeadragon.Point = OpenSeadragon.Point



export default {
    name: 'Note',
    props: {
        object: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        caseId: {
            type: String,
            requied: true
        },
        fileId: {
            type: String,
            required: true
        },
        $store: {
            type: Object,
            required: true
        },
        $bus: {
            type: Object,
            required: true
        },
        isWebinar: {
            type: Boolean
        },
        ableToAct: {
            type: Boolean
        },
        primary: {
            type: Boolean
        },
        viewer: {
            type: Object
        },
        openOnCreate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            openedComment: false,
            opened: false,
            empty: true,
            focused: false,
            commentStyles: {
                top: `20px`,
                left: `-320px`,
                transform: 'rotate(' + (this.viewer.viewport.getRotation() * -1) + 'deg)'
            },
            Archived: Archived
        }
    },
    computed: {
        ...mapState({
            caseOwnerId: state => state.case.id && state.case.owner ? state.case.owner.id : null,
            accountId: state => state.account.id,
            isArchived: state => state.case.status === Archived
        }),
        // accountAvatar() {
        //    const avatar = {
        //         'background-image': `url(/images/button_hover.png)`
        //     }
        //     return avatar ? {
        //         'background-image': `url(/images/button_hover.png)`
        //     } : {}
        // },
        noteType() {
            return this.type === 'mark' ? 'отметку' : 'линейку'
        },
        isEditable() {
            return this.status !== Archived
            // return (this.object.author.id === this.accountId || this.caseOwnerId === this.accountId) && this.status !== Archived
        },
        parent() {
            return this.$el.parentNode
        },
        isNoteOwner() {
            return true
            // return this.accountId === this.object.author.id
        },
        commentPlaceholder() {
            return "Добавьте коментарий"
                // this.$t('case.viewer.note.write_comment', { type: this.type === 'mark' ? this.$tc('case.viewer.note.mark', 1) : this.$tc('case.viewer.note.ruler', 1) }) :
                // "case.viewer.note.write_comment" :
                
                // this.$t('case.viewer.note.no_comment', { type: this.type === 'mark' ? this.$tc('case.viewer.note.mark', 1) : this.$tc('case.viewer.note.ruler', 1) })
        }
    },
    methods: {
        cleanPaste(e) { cleanPaste(e) },
        openComment(){
            if (!this.openedComment) {
                this.viewer.addHandler('canvas-click', this.commentClickHandler)
                this.openedComment = true
            } else {
                                this.openedComment = false
            }
        },
        commentClickHandler(e) {
            this.$refs.comment.classList += ' visible'
                        this.$nextTick(() => {
                if (this.opened) this.noteBoundsCheck()
            })
        },
        // eslint-disable-next-line no-unused-vars
        onKeyUp(e) {
            if (this.$refs.text.textContent.length) {
                this.empty = false
            } else {
                this.empty = true
            }
        },
        deleteNote() {
            const actionType = this.type === 'mark' ? 'deleteMark' : 'deleteRuler'
            this[actionType]({
                    caseId: this.caseId,
                    fileId: this.fileId,
                    itemId: this.object.id,
                    webinarId: this.isWebinar ? this.$store.state.webinar.id : null
                })
                .then(() => {
                    this.clearComponent()
                    if (this.isWebinar && this.ableToAct) {
                        const action = this.type === 'mark' ? 'deleteMark' : 'deleteRuler'
                        this.$bus.$emit('sendMessage', {
                            action: action,
                            data: {
                                id: this.object.id
                            }
                        })
                    }
                })
                .catch(console.error)
        },
        editNote() {
            const actionType = this.type === 'mark' ? 'editMark' : 'editRuler'
            const item = { ...this.object }
            let text = this.$refs.text.textContent.trim()
            item.text = text
            this.$refs.text.textContent = text
            this[actionType]({
                    caseId: this.caseId,
                    fileId: this.fileId,
                    itemId: this.object.id,
                    item,
                    webinarId: this.isWebinar ? this.$store.state.webinar.id : null
                })
                .then(() => {
                    // eslint-disable-next-line vue/no-mutating-props
                    this.object.text = text
                    
                        this.$bus.$emit('sendMessage', {
                            action: actionType,
                            data: {
                                id: this.object.id,
                                text
                            }
                        })
                    
                })
                .catch(console.error)
        },
        editMark() {
            this.$emit('noteOpened', this.object.id)
            this.opened = true
            this.$nextTick(() => {
                if (this.opened) this.noteBoundsCheck()
            })
        },
        toggleOpened(sendBusMessage = true) {
            console.log(this.parent, 'toggleOpened')            // hack with loosing z-index context during rotation
            this.opened ? this.parent.style.zIndex = '' : this.parent.style.zIndex = 1
            this.opened = !this.opened
            this.opened ? this.parent.style.zIndex = 2 : this.parent.style.zIndex = 1
            this.$nextTick(() => {
                if (this.opened) this.noteBoundsCheck()
            })
            // this.$emit('noteOpened', this.object.id)
            if (sendBusMessage) this.$bus.$emit('noteOpened', this.object.id)

                const action = this.type === 'mark' ? 'toggleMark' : 'toggleRuler'
                this.$bus.$emit('sendMessage', {
                    action: action,
                    data: {
                        primary: this.primary,
                        id: this.object.id,
                        opened: true,
                        isNewInterface: true
                    }
                })
            
        },
        // eslint-disable-next-line no-unused-vars
        downHandler(e) {
            if (this.ableToAct) {
                this.viewer.addHandler('canvas-drag', this.moveHandler)
                this.viewer.addHandler('canvas-release', this.upHandler)
            }
        },
        upHandler(e) {
            if (this.$refs.comment && !this.$refs.comment.contains(e.originalEvent.target)) {
                this.opened = false
                this.parent.style.zIndex = 1

                    const action = this.type === 'mark' ? 'toggleMark' : 'toggleRuler'
                    this.$bus.$emit('sendMessage', {
                        action: action,
                        data: {
                            primary: this.primary,
                            id: this.object.id,
                            opened: false
                        }
                    })
                
            }
        },
        // eslint-disable-next-line no-unused-vars
        moveHandler(e) {
            this.viewer.removeHandler('canvas-release', this.upHandler)
        },
        clearComponent() {
            this.$el.remove()
            this.$destroy()
            if (this.type === 'ruler') {
                let rulerPoints = Array.from(document.querySelectorAll(`.ruler-point[data-id="${this.object.id}"]`))
                rulerPoints.forEach(point => this.viewer.removeOverlay(point))
                const line = document.getElementById(this.object.id)
                line.remove()
            }
        },
        noteBoundsCheck() {
            // data prepare
            console.log(this.object)
            const coords = this.object.endPoint ?
                { x: this.object.endPoint.ip.x, y: this.object.endPoint.ip.y } :
                { x: this.object.x, y: this.object.y }
                console.log(coords)
                                console.log(this.viewer.viewport)
            const pointOpensea = new OpenSeadragon.Point({x: coords.x, y: coords.y})
            const point = this.viewer.viewport.imageToWindowCoordinates(pointOpensea)
            const viewerBounds = this.viewer.container.getBoundingClientRect()
            const formBounds = {
                width: 300 + 20,
                height: 250 + 20
            }

            // replace comment form
            const defaultStyles = {
                top: `20px`,
                left: `-320px`,
                transform: 'rotate(' + (this.viewer.viewport.getRotation() * -1) + 'deg)'
            }
            if ((point.x - formBounds.width < viewerBounds.left) && (point.y + formBounds.height > viewerBounds.bottom)) {
                defaultStyles.top = `${-formBounds.height}px`
                defaultStyles.left = `30px`
            } else if (point.x - formBounds.width < viewerBounds.left) {
                defaultStyles.top = `40px`
                defaultStyles.left = `40px`
            } else if (point.y + formBounds.height > viewerBounds.bottom) {
                defaultStyles.top = `${-formBounds.height}px`
            }
            this.commentStyles = defaultStyles
            if (this.$refs.ruler) this.$refs.ruler.style.transform = defaultStyles.transform
        },
        busToggleNote(msg) {
            if (this.primary === msg.primary && this.object.id === msg.id) {
                this.opened = msg.opened
                this.$nextTick(() => {
                    if (this.opened) this.noteBoundsCheck()
                })
            }
        },
        busDeleteNote(msg) {
            if (this.object.id === msg.id) {
                const mutationName = msg.type === 'mark' ? 'DELETE_MARK' : 'DELETE_RULER'
                this.clearComponent()
                this.$store.commit(mutationName, {
                    fileId: this.fileId,
                    itemId: msg.id
                })
            }
        },
        busEditNote(msg) {
            if (this.object.id === msg.id) {
                const mutationName = msg.type === 'mark' ? 'EDIT_MARK' : 'EDIT_RULER'
                const item = { ...this.object }
                item.text = msg.text
                this.$store.commit(mutationName, {
                    fileId: this.fileId,
                    item
                })
            }
        },
        closeOnOtherOpen(id) {
            if ((this.opened && this.object.id !== id) || (!this.opened && this.object.id === id)) this.toggleOpened(false)
        },
        // eslint-disable-next-line no-unused-vars
        preventHandler(e) {

        },
        ...mapActions(['deleteMark', 'deleteRuler', 'editMark', 'editRuler'])
    },
    mounted() {

        // document.getElementsByClassName('comment-form').addEventListener('click')
        // const rulerLength = document.getElementById(`${this.object.id}`)[0]
        // rulerLength.addEventListener('click', this.toggleOpened(true))
        // this.viewer.addHandler('canvas-click', this.toggleOpened(true))
        // 'canvas-click'
        // document.getElementsByClassName(`${this.object.id}`).addHandler('click', this.toggleOpened(true))
        // detects if clicked on another note container or canvas
        this.$nextTick(() => {
            this.viewer.addHandler('canvas-press', this.downHandler)
            this.parent.style.zIndex = 1
            if (this.openOnCreate) this.toggleOpened()
            this.$nextTick(() => {
                if (this.opened) this.noteBoundsCheck()
            })
// this.$emit('noteOpened', this.closeOnOtherOpen)
            this.$bus.$on('toggleNote', this.busToggleNote)
            this.$bus.$on('deleteNote', this.busDeleteNote)
            this.$bus.$on('editNote', this.busEditNote)
            this.$bus.$on('noteOpened', this.closeOnOtherOpen)
        })
    },
    beforeDestroy() {
        this.viewer.removeHandler('canvas-press', this.downHandler)
        this.viewer.removeHandler('canvas-release', this.upHandler)

        this.$bus.$off('toggleNote', this.busToggleNote)
        this.$bus.$off('deleteNote', this.busDeleteNote)
        this.$bus.$off('editNote', this.busEditNote)
        this.$bus.$off('noteOpened', this.closeOnOtherOpen)
    }
}
</script>

<style lang="scss">
// @import "src/globals.scss";
.note-container {
    position: relative;
        top: 32px;
    width: 40px;
    height: 40px;
    background: transparent;
    border-radius: 30px;
    opacity: 1;
    color: white;
    font-weight: 900;
    text-align: center;
    border: white 5px solid;
    border-style: solid;
    cursor: grab;
    z-index: 4;
}

.comment-form {
display: none;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    width: 350px;
    position: absolute;
    pointer-events: all;
    z-index: 2;
    overflow: hidden;
    color: black;
    font-weight: 600;
    border: 4px solid;
    border-style: double;
}

.comment-form.visible {
    display: block;
}

.comment-author {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0 15px;
    padding-top: 10px;
    margin-bottom: 10px;
    width: 100%;
}

.comment-author .avatar {
    background-repeat: no-repeat;
    background-size: contain;
}

.comment-author .avatar.default {
    // background-image: url(/static/icons/default_avatar.svg);
    background-color: #d6d6d6;
    background-size: contain;
}

.comment-author .name {
    margin-left: 10px;
    color: #000000;
}

.editor-container {
    padding: 0 15px;
    width: 100%;
}

.comment-form .editor {
    width: 100%;
    margin-bottom: 10px;
    min-height: 21px;
}

.editor.center-placeholder {
    text-align: center;
}

.editor .text[contenteditable] {
    outline: 0;
    white-space: pre-wrap;
}

.editor .focused {
    display: block;
}

.editor .placeholder {
    color: #ABB5BB;
    pointer-events: none;
}

.comment-form .date {
    // // include fontCaption;
    width: 100%;
    text-align: right;
    color: #041823;
    padding: 0 0;
    margin-bottom: 10px;
}

.comment-form .delete-comment {
    width: 30%;
    padding: 10px;
    opacity: .7;
    transition: opacity .3s ease;
}

.comment-form .delete-comment:hover {
    opacity: 1;
}
</style>

