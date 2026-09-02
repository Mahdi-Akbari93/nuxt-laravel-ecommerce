<template>
  <div class="admin-shell">
    <LayoutsHeader></LayoutsHeader>

    <div class="container-fluid">
      <div class="row">
        <LayoutsSidebar></LayoutsSidebar>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-content">
            <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>
