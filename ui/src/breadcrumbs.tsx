// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Breadcrumb } from '@fluentui/react'
import React from 'react'
import { cards } from './layout'
import { bond, Card, S, qd } from './qd'

/** Create a breadcrumb for a `h2o_wave.types.BreadcrumbsCard()`. */
interface Breadcrumb {
  /** The name of this item. Prefix the name with a '#' to trigger hash-change navigation. */
  name: S
  /** The label to display. */
  label: S
}
/**
 * Create a card containing breadcrumbs.
 * Breadcrumbs should be used as a navigational aid in your app or site.
 * They indicate the current page’s location within a hierarchy and help
 * the user understand where they are in relation to the rest of that hierarchy.
 * They also afford one-click access to higher levels of that hierarchy.
 * Breadcrumbs are typically placed, in horizontal form, under the masthead
 * or navigation of an experience, above the primary content area.
 */
interface State {
  /** A list of `h2o_wave.types.Breadcrumb` instances to display. See `h2o_wave.ui.breadcrumb()` */
  items: Breadcrumb[]
}

export const
  View = bond(({ name, state, changed }: Card<State>) => {
    const
      items = state.items.map(({ name, label }) => ({
        key: name,
        text: label,
        onClick: () => {
          if (name.startsWith('#')) {
            window.location.hash = name.substr(1)
            return
          }
          qd.args[name] = true
          qd.sync()
        }
      }
      )),
      render = () => <Breadcrumb data-test={name} items={items} />

    return { render, changed }
  })

cards.register('breadcrumbs', View)
