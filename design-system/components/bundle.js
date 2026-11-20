/* @ds-bundle: {"format":4,"namespace":"MechLend","components":[{"name":"Logo"},{"name":"Button"},{"name":"LtvBadge"},{"name":"LtvMeter"},{"name":"Stat"},{"name":"TextField"},{"name":"CollateralCard"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  var STATE_LABEL = { safe: 'Healthy', watch: 'Watch', call: 'Margin call', neutral: 'Closed' };
  function ltvState(ltv, watch, call) {
    if (ltv >= call) return 'call';
    if (ltv >= watch) return 'watch';
    return 'safe';
  }
  function pct(n) { return n.toFixed(1) + '%'; }


  var MARK_PATH = 'M9 0h18a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9zM10 12h16a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5H10a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 10 12z';
  function Logo(props) {
    var variant = props.variant || 'lockup', size = props.size || 24;
    var mark = h('svg', { className: 'ml-logo-mark', viewBox: '0 0 36 30', width: size * 1.2, height: size, 'aria-hidden': variant === 'lockup' ? true : undefined, role: variant === 'mark' ? 'img' : undefined, 'aria-label': variant === 'mark' ? 'Mech Lend' : undefined },
      h('path', { d: MARK_PATH, fillRule: 'evenodd', style: { fill: 'var(--ink)' } }),
      h('circle', { cx: 24, cy: 15, r: 2, style: { fill: 'var(--signal)' } }));
    if (variant === 'mark') return mark;
    return h('span', { className: 'ml-logo', style: { gap: Math.round(size * 0.6) } }, mark,
      h('span', { className: 'ml-logo-word', style: { fontSize: Math.round(size * 0.56) } }, 'MECH LEND'));
  }

  function Button(props) {
    var variant = props.variant || 'secondary', size = props.size || 'md';
    var rest = Object.assign({}, props);
    delete rest.variant; delete rest.size; delete rest.className;
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('ml-btn', 'ml-btn-' + variant, size === 'sm' && 'ml-btn-sm', props.className)
    }), props.children);
  }

  function LtvBadge(props) {
    var state = props.state || 'safe';
    return h('span', { className: 'ml-badge ml-badge-' + state }, props.children || STATE_LABEL[state]);
  }

  function LtvMeter(props) {
    var ltv = props.ltv, watch = props.watch == null ? 60 : props.watch, call = props.call == null ? 75 : props.call;
    var max = props.max || 100;
    var state = ltvState(ltv, watch, call);
    var at = function (v) { return Math.min(100, (v / max) * 100) + '%'; };
    return h('div', { className: 'ml-meter', role: 'meter', 'aria-valuenow': ltv, 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-label': 'Loan-to-value' },
      h('div', { className: 'ml-meter-head' },
        h('span', { className: 'ml-meter-label' }, props.label || 'Loan-to-value'),
        h('span', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          h('span', { className: 'ml-meter-value' }, pct(ltv)),
          h(LtvBadge, { state: state }))),
      h('div', { className: 'ml-meter-track' },
        h('div', { className: 'ml-meter-fill ' + state, style: { width: at(ltv) } }),
        h('div', { className: 'ml-meter-tick', style: { left: at(watch) }, title: 'Watch at ' + watch + '%' }),
        h('div', { className: 'ml-meter-tick', style: { left: at(call) }, title: 'Margin call at ' + call + '%' })),
      h('div', { className: 'ml-meter-scale' },
        h('span', { className: 'at-watch', style: { left: at(watch) } }, 'Watch ' + watch + '%'),
        h('span', { className: 'at-call', style: { left: at(call) } }, 'Call ' + call + '%')));
  }

  function Stat(props) {
    return h('div', { className: cx('ml-stat', props.size === 'sm' && 'ml-stat-sm') },
      h('span', { className: 'ml-stat-label' }, props.label),
      h('span', { className: 'ml-stat-value', style: props.tone ? { color: 'var(--' + props.tone + ')' } : null }, props.value),
      props.note ? h('span', { className: 'ml-stat-note' }, props.note) : null);
  }

  var fieldId = 0;
  function TextField(props) {
    var idRef = React.useRef(null);
    if (idRef.current == null) idRef.current = props.id || 'ml-field-' + (++fieldId);
    var id = idRef.current;
    var rest = Object.assign({}, props);
    ['label', 'prefix', 'suffix', 'help', 'error', 'numeric', 'className'].forEach(function (k) { delete rest[k]; });
    var msg = props.error || props.help;
    return h('div', { className: cx('ml-field', props.error && 'error', props.className) },
      h('label', { className: 'ml-field-label', htmlFor: id }, props.label),
      h('div', { className: cx('ml-field-box', props.numeric && 'mono') },
        props.prefix ? h('span', { className: 'ml-field-unit pre' }, props.prefix) : null,
        h('input', Object.assign({ id: id, inputMode: props.numeric ? 'decimal' : undefined, 'aria-invalid': props.error ? true : undefined, 'aria-describedby': msg ? id + '-help' : undefined }, rest)),
        props.suffix ? h('span', { className: 'ml-field-unit post' }, props.suffix) : null),
      msg ? h('span', { className: 'ml-field-help', id: id + '-help' }, msg) : null);
  }

  function money(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function CollateralCard(props) {
    var ltv = props.principal / props.valuation * 100;
    return h('article', { className: 'ml-card' },
      h('div', { className: 'ml-card-head' },
        h('div', null,
          h('div', { className: 'ml-card-class' }, props.robotClass),
          h('h3', { className: 'ml-card-title' }, props.model),
          h('span', { className: 'ml-serial' }, 'SN ' + props.serial)),
        props.status ? h(LtvBadge, { state: props.status }) : null),
      h(LtvMeter, { ltv: ltv, watch: props.watch, call: props.call }),
      h('div', { className: 'ml-card-stats' },
        h(Stat, { size: 'sm', label: 'Valuation', value: money(props.valuation) }),
        h(Stat, { size: 'sm', label: 'Principal', value: money(props.principal) }),
        h(Stat, { size: 'sm', label: 'APR', value: props.apr.toFixed(2) + '%' })),
      props.children ? h('div', { className: 'ml-card-foot' }, props.children) : null);
  }

  window.MechLend = Object.assign(window.MechLend || {}, {
    Logo: Logo, Button: Button, LtvBadge: LtvBadge, LtvMeter: LtvMeter, Stat: Stat, TextField: TextField, CollateralCard: CollateralCard
  });
})();
