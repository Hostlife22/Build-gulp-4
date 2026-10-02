import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Icon } from './components/Icon';
import { SceneBoundary } from './components/SceneBoundary';
import { OBJECTS, getObject, type ObjectId } from './config/objects';
import {
  cameraTarget,
  initialSelection,
  selectionReducer,
} from './state/selection';
import { useMotionPreference } from './state/useMotionPreference';

const Scene = lazy(() => import('./scene/Scene'));

export function App() {
  const [state, dispatch] = useReducer(selectionReducer, initialSelection);
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const [help, setHelp] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const guide = useRef<HTMLElement>(null);
  const guideButton = useRef<HTMLButtonElement>(null);
  const closeGuide = useCallback(() => {
    setHelp(false);
    guideButton.current?.focus();
  }, []);
  useEffect(() => {
    if (help) guide.current?.focus();
  }, [help]);
  const returnFocus = useRef<HTMLElement | null>(null);
  const object = state.selected ? getObject(state.selected) : null;
  const select = useCallback((id: ObjectId) => {
    if (
      document.activeElement instanceof HTMLElement &&
      !panel.current?.contains(document.activeElement)
    )
      returnFocus.current = document.activeElement;
    dispatch({ type: 'select', id });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
    returnFocus.current?.focus();
  }, []);
  useEffect(() => {
    if (state.selected) panel.current?.focus();
  }, [state.selected]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (help) closeGuide();
        else reset();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [reset, help, closeGuide]);
  return (
    <>
      <a className="skip-link" href="#objects">
        Skip to room objects
      </a>
      <header className="site-header">
        <a className="wordmark" href={import.meta.env.BASE_URL}>
          <span className="brand-icon">
            <Icon name="sun" size={26} />
          </span>
          sunday<span className="wordmark-light">space</span>
          <span className="brand-period">.</span>
        </a>
        <span className="header-note">Small spaces. Good feelings.</span>
        <button
          className="text-button"
          ref={guideButton}
          aria-expanded={help}
          onClick={() => setHelp(!help)}
        >
          A little guide <span className="question-mark">?</span>
        </button>
      </header>
      <main>
        <section className="experience" aria-label="Interactive cozy room">
          <div className="intro">
            <div className="eyebrow">
              <span /> AN INTERACTIVE LITTLE ESCAPE
            </div>
            <h1>
              A little room
              <br />
              to <em>slow down.</em>
            </h1>
            <p>
              Good light. Familiar things. A moment of calm.
              <br className="desktop-break" /> Come in and make yourself at
              home.
            </p>
            <div className="intro-hint">
              <span className="small-cross">
                <Icon name="plus" size={14} />
              </span>{' '}
              Pick an object. Discover its story.
            </div>
          </div>
          <div
            className="scene-container"
            aria-label="Isometric room with six explorable objects"
          >
            <SceneBoundary>
              <Suspense
                fallback={
                  <div className="scene-fallback" role="status">
                    Making room for a little calm…
                  </div>
                }
              >
                <Scene
                  selected={state.selected}
                  onSelect={select}
                  target={cameraTarget(state)}
                  reduced={reduced}
                  moving={!paused && !reduced}
                />
              </Suspense>
            </SceneBoundary>
          </div>
          <div className="room-label">
            <span className="room-label-line" />
            <div>
              <span className="eyebrow">THE SUNDAY COLLECTION</span>
              <p>
                No. 001 <span>/</span> The living room
              </p>
            </div>
          </div>
          <div className="scene-status">
            <span className="status-dot" />
            {reduced
              ? 'Reduced motion'
              : paused
                ? 'A still moment'
                : 'A living, breathing space'}
          </div>
          {object && (
            <section
              className="detail-panel"
              ref={panel}
              tabIndex={-1}
              aria-labelledby="detail-title"
            >
              <div className="panel-top">
                <span className="eyebrow">{object.category}</span>
                <button
                  className="icon-button"
                  aria-label="Close description"
                  onClick={reset}
                >
                  <Icon name="close" />
                </button>
              </div>
              <h2 id="detail-title">{object.label}</h2>
              <p>{object.description}</p>
              <div className="material-note">{object.detail}</div>
              <button className="text-button back-button" onClick={reset}>
                <Icon name="reset" size={16} /> Back to the room
              </button>
            </section>
          )}
          {help && (
            <aside
              className="guide"
              aria-label="Room guide"
              ref={guide}
              tabIndex={-1}
            >
              <div className="panel-top">
                <h2>Make yourself at home.</h2>
                <button
                  className="icon-button"
                  aria-label="Close guide"
                  onClick={closeGuide}
                >
                  <Icon name="close" />
                </button>
              </div>
              <p>
                Click a numbered marker or an object to take a closer look. Use
                the object list below with Tab and Enter. Escape brings you back
                to the room.
              </p>
              <p>Take your time. There’s no wrong way to explore.</p>
            </aside>
          )}
        </section>
        <section
          className="explore-bar"
          id="objects"
          aria-labelledby="explore-title"
        >
          <div className="explore-heading">
            <Icon name="cube" size={23} />
            <div>
              <h2 id="explore-title">The little things</h2>
              <p>Six objects. A feeling of home.</p>
            </div>
          </div>
          <div className="object-list" role="group" aria-label="Room objects">
            {OBJECTS.map((item, index) => (
              <button
                key={item.id}
                className={`object-button ${state.selected === item.id ? 'active' : ''}`}
                aria-pressed={state.selected === item.id}
                onClick={() => select(item.id)}
                aria-label={item.label}
              >
                <span className="object-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.shortLabel}</span>
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </div>
          <div className="view-controls">
            <button
              className="icon-button"
              aria-label="Return to full room view"
              onClick={reset}
              title="Return to room (Esc)"
            >
              <Icon name="reset" />
            </button>
            <button
              className="icon-button"
              disabled={reduced}
              aria-label={
                paused
                  ? 'Resume ambient animations'
                  : 'Pause ambient animations'
              }
              aria-pressed={paused || reduced}
              onClick={() => setPaused(!paused)}
              title={
                reduced
                  ? 'Motion reduced by system preference'
                  : 'Toggle ambient motion'
              }
            >
              <Icon name={paused || reduced ? 'play' : 'pause'} />
            </button>
          </div>
        </section>
      </main>
      <footer>
        <span>A space for doing a little less.</span>
        <span>
          MADE OF SIMPLE THINGS <span className="footer-flower">✳</span>
        </span>
      </footer>
    </>
  );
}
