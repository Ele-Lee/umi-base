const requestCreatingNodeNames = ['img', 'script', 'link', 'canvas', 'svg'];

export default class MyTTi {
  cb: any = null;
  intervalTime = 1600;
  timer: any = null;
  hadTriggerLoad = false;
  _fisterInteractiveResolver: any = null;
  resources: Array<{ initiatorType: string; name: string; entryType: string }> = [];

  constructor() {
    this.registerObservers();
    // this.initLoop();
  }

  triggerOutsideCb() {
    clearTimeout(this.timer);
    // @ts-ignore
    window.__resources_by_tti = this.resources;
    if (typeof this._fisterInteractiveResolver === 'function') {
      this._fisterInteractiveResolver();
    }
  }

  registerObservers() {
    this._registerPerformanceObserver();
    this._observeResourceFetchingMutations();
  }

  initLoop() {
    return new Promise((resolve, reject) => {
      // document.onreadystatechange = function () {
      // };
      const _launch = () => {
        this.hadTriggerLoad = true;
        this._rescheduleTimer();
      };

      this._fisterInteractiveResolver = resolve;
      if (document.readyState == 'complete') {
        _launch();
      } else {
        window.addEventListener('load', _launch);
      }
    });
  }

  _observeResourceFetchingMutations() {
    const mutationObserver = new MutationObserver(mutations => {
      mutations = /** @type {!Array<!MutationRecord>} */ mutations;

      for (const mutation of mutations) {
        if (
          mutation.type == 'childList' &&
          subtreeContainsNodeName(mutation.addedNodes, requestCreatingNodeNames)
        ) {
          this._rescheduleTimer();
        }
      }
    });
    mutationObserver.observe(window.__fatherDom__ || document, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['href', 'src'],
    });

    return mutationObserver;
  }

  _rescheduleTimer(time = this.intervalTime) {
    if (!this.hadTriggerLoad) return;
    clearTimeout(this.timer);
    // @ts-ignore
    this.timer = setTimeout(() => {
      this.triggerOutsideCb();
    }, time);
  }

  _registerPerformanceObserver() {
    const observer = new PerformanceObserver((entryList, obj) => {
      const entries = entryList.getEntries();
      for (const entry of entries) {
        // 不是当前图片项目的资源，不处理。理论上应该配置webpack变量存储项目名
        if (entry.name.indexOf('/image') < 0) return;
        this._recordResources(entry as PerformanceEntry);
        this._rescheduleTimer();
        // if (entry.entryType === 'resource') {
        // } else {
        // }
      }
    });
    observer.observe({ entryTypes: ['resource', 'longtask'] });
  }

  _recordResources(res: PerformanceEntry) {
    const { initiatorType, name, entryType } = res;
    this.resources.push({
      initiatorType,
      name,
      entryType,
    });
  }
}

interface PerformanceEntry extends globalThis.PerformanceEntry {
  initiatorType: string;
  // entryType: string;
  // name: string;
}

function subtreeContainsNodeName(nodes: any, nodeNames: any) {
  for (const node of nodes) {
    if (
      (node.nodeName && nodeNames.includes(node.nodeName.toLowerCase())) ||
      (node.children && subtreeContainsNodeName(node.children, nodeNames))
    ) {
      return true;
    }
  }
  return false;
}
